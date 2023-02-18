<script setup>
import axios from "axios";
import axiosRetry from "axios-retry";
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

// unmount hooks
const unmountFindInvitationForm = ref(() => { });
const unmountInitialRsvpForm = ref(() => { });
const unmountUpdateRsvpForm = ref(() => { });

// hidden fields
const hiddenFirstName = ref("");
const hiddenLastName = ref("");
const hiddenEmail = ref("");
const hiddenIsAttending = ref(false);
const hiddenHasDietaryRestrictions = ref(false);
const hiddenWhatDietaryRestrictions = ref("");
const hiddenHasPlusOne = ref(false);
const hiddenPlusOneFirstName = ref("");
const hiddenPlusOneLastName = ref("");
const hiddenPlusOneHasDietaryRestrictions = ref(false);
const hiddenPlusOneWhatDietaryRestrictions = ref("");
const hiddenRegards = ref("");

/* ---------- TYPEFORM MOUNTING FUNCTIONS -------------------------------------------------------------------------- */

const findYourInvitationForm = {
    formId: 'I2mEWmdK',
    elementId: '#find-your-invitation',
};
const initialRsvpForm = {
    formId: 'TSAzjn3J',
    elementId: '#initial-rsvp',
};
const updateRsvpForm = {
    formId: 'XCprIrt2',
    elementId: '#update-rsvp',
};

function mountFindInvitationForm() {
    const { refresh, unmount } = createWidget(findYourInvitationForm.formId, {
        container: document.querySelector(findYourInvitationForm.elementId),
        fullScreen: true,
        onSubmit: findYourInvitation,
    });

    unmountFindInvitationForm.value = unmount;
}

function mountInitialRsvpForm() {
    if (!(hiddenFirstName.value && hiddenLastName.value && hiddenEmail.value)) {
        // TODO show error message
        return;
    }
    const { refresh, unmount } = createWidget(initialRsvpForm.formId, {
        container: document.querySelector(initialRsvpForm.elementId),
        fullScreen: true,
        onSubmit: submitInitialRsvp,
        hidden: {
            first_name: hiddenFirstName.value,
            last_name: hiddenLastName.value,
            email: hiddenEmail.value,
        },
    });

    unmountInitialRsvpForm.value = unmount;
}

function createRsvpSummary() {
    let rsvpSummary = "You ";
    if (hiddenIsAttending.value) {
        const plusOne = hiddenHasPlusOne.value
        const dr = hiddenHasDietaryRestrictions.value ? hiddenWhatDietaryRestrictions.value : null;
        const podr = hiddenPlusOneHasDietaryRestrictions.value ? hiddenPlusOneWhatDietaryRestrictions.value : null;

        if (plusOne) {
            rsvpSummary += `and ${hiddenPlusOneFirstName.value} ${hiddenPlusOneLastName.value} `
        }
        rsvpSummary += "will be joining us on September 3, 2023.\n"

        if (plusOne) {
            if (dr && podr) {
                rsvpSummary += `Your dietary restrictions are: ${dr}.\n`
                rsvpSummary += `${hiddenPlusOneFirstName.value}'s dietary restrictions are: ${podr}.`
            }
            else if (dr) {
                rsvpSummary += `Your dietary restrictions are: ${dr}.\n`
                rsvpSummary += `${hiddenPlusOneFirstName.value} has no dietary restrictions.`
            }
            else if (podr) {
                rsvpSummary += `You have no dietary restrictions.\n`
                rsvpSummary += `${hiddenPlusOneFirstName.value}'s dietary restrictions are: ${podr}.`
            }
            else {
                rsvpSummary += "Neither of you have any dietary restrictions."
            }
        }
        else if (dr) {
            // no plus one and has dietary restrictions
            rsvpSummary += `Your dietary restrictions are: ${dr}.`
        }
        else {
            // no plus one and no dietary restrictions
            rsvpSummary += "You have no dietary restrictions."
        }

    }
    else {
        // not attending
        rsvpSummary += " are regretfully unable to join us on September 3, 2023 and have left "
        if (hiddenRegards.value) {
            rsvpSummary += `your regards: "${regards}".`
        }
        else {
            rsvpSummary += "no regards."
        }

    }
    return rsvpSummary;
}

function mountUpdateRsvpForm() {
    if (!hiddenIsAttending) {
        // TODO show error message
        return;
    }

    console.log("mountUpdateRsvpForm()")

    // create dynamic text passed to form via hidden values
    const rsvpSummary = createRsvpSummary();
    const dietaryRestrictionSummary = hiddenHasDietaryRestrictions.value ?
        `Your dietary restrictions are: ${hiddenWhatDietaryRestrictions.value}.` :
        "You have no dietary restrictions.";
    const plusOneDietaryRestrictionSummary = hiddenHasPlusOne.value ?
        (
            hiddenPlusOneHasDietaryRestrictions.value ?
                `${hiddenPlusOneFirstName.value}'s' dietary restrictions are: ${hiddenPlusOneWhatDietaryRestrictions.value}.` :
                `${hiddenPlusOneFirstName.value} has no dietary restrictions.`
        ) :
        "";
    const hiddenFields = {
        first_name: hiddenFirstName.value,
        last_name: hiddenLastName.value,
        email: hiddenEmail.value,
        is_attending: hiddenIsAttending.value.toString(),
        has_dietary_restrictions: hiddenHasDietaryRestrictions.value.toString(),
        dietary_restrictions: hiddenWhatDietaryRestrictions.value,
        has_plus_one: hiddenHasPlusOne.value.toString(),
        plus_one_first_name: hiddenPlusOneFirstName.value,
        plus_one_last_name: hiddenPlusOneLastName.value,
        plus_one_has_diet_restrictions: hiddenPlusOneHasDietaryRestrictions.value.toString(),
        plus_one_dietary_restrictions: hiddenPlusOneWhatDietaryRestrictions.value,
        regards: hiddenRegards.value,
        rsvp_summary: rsvpSummary,
        dr_summary: dietaryRestrictionSummary,
        plus_one_dr_summary: plusOneDietaryRestrictionSummary,
    }

    const { refresh, unmount } = createWidget(updateRsvpForm.formId, {
        container: document.querySelector(updateRsvpForm.elementId),
        fullScreen: true,
        onSubmit: submitUpdateRsvp,
        hidden: hiddenFields,
    });

    unmountUpdateRsvpForm.value = unmount;
}

/* ---------- CALLBACK FUNCTIONS ----------------------------------------------------------------------------------- */

// axios instance for backend API
const api = axios.create({
    baseURL: "https://rsvp-rcqzf.ondigitalocean.app/api/rsvp/"
});
axiosRetry(api, {
    retries: 3,
    retryDelay: (retryCount) => {
        console.log("Retry attempt:", retryCount);
        return retryCount * 500
    },
    retryCondition: (error) => {
        return error.response.status >= 500;
    }
})

function findYourInvitation(data) {
    const responseId = data.responseId;

    console.log("Find invite response ID", responseId);

    api.get(responseId)
        .then(function (response) {
            const data = response.data;
            hiddenFirstName.value = data.firstName;
            hiddenLastName.value = data.lastName;
            hiddenEmail.value = data.email;
            console.log(data);

            if (response.data.timestamp) {
                // a previous RSVP exists, write hidden field values and show update RSVP form
                hiddenIsAttending.value = data.isAttending;
                hiddenHasDietaryRestrictions.value = data.hasDietaryRestrictions;
                hiddenWhatDietaryRestrictions.value = data.dietaryRestrictions;
                hiddenHasPlusOne.value = data.hasPlusOne;
                hiddenPlusOneFirstName.value = data.plusOneFirstName;
                hiddenPlusOneLastName.value = data.plusOneLastName;
                hiddenPlusOneHasDietaryRestrictions.value = data.plusOneHasDietaryRestrictions;
                hiddenPlusOneWhatDietaryRestrictions.value = data.plusOneDietaryRestrictions;
                hiddenRegards.value = data.regards;

                (unmountFindInvitationForm.value)();
                mountUpdateRsvpForm();
            }
            else {
                // no previous RSVP exists, show initial RSVP form
                (unmountFindInvitationForm.value)();
                mountInitialRsvpForm();
            }
        })
        .catch(function (error) {
            if (error.response) {
                const status = error.response.status;
                console.log(error.response);
                if (status == 404) {
                    // TODO: not in invitation list, show modal saying "if this is a mistake, please contact Na or Richard."
                }
                else {
                    // TODO: show "Oops! Something went wrong. Try again later or let Na or Richard know if it's still a problem."
                }
            }
            else {
                console.log("Error", error.message);
                console.log(error)
            }
        })
}

function submitInitialRsvp(data) {
    const responseId = data.responseId;

    api.post(responseId)
        .catch(function (error) {
            // TODO: show "Oops! Something went wrong. Try again later or let Na or Richard know if it's still a problem."
            if (error.response) {
                console.log(error.response);
            }
            else {
                console.log("Error", error.message);
            }
        })
}

function submitUpdateRsvp(data) {
    const responseId = data.responseId;

    api.put(responseId)
        .catch(function (error) {
            // TODO: show "Oops! Something went wrong. Try again later or let Na or Richard know if it's still a problem."
            if (error.response) {
                console.log(error.response);
            }
            else {
                console.log("Error", error.message);
            }
        })

}

/* ---------- END MOUNTING + CALLBACK FUNCTIONS -------------------------------------------------------------------- */

onMounted(() => {
    mountFindInvitationForm();
});
</script>

<template>
    <div>
        <div id="find-your-invitation"></div>
        <div id="initial-rsvp"></div>
        <div id="update-rsvp"></div>
    </div>
</template>

<style>
.z-top {
    z-index: 10002;
}
</style>