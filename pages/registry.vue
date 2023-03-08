<script setup>
onMounted(() => {
    // Typeform sets `overflow: hidden` on `body` when a form is mounted, and that style is retained when moving to another page.
    // This fixes that problem by removing the style.
    const body = document.querySelector("body");
    if (body) {
        body.style.cssText = "";
    }

    // This embeds the Zola registry.
    !function (e, t, n) { var s, a = e.getElementsByTagName(t)[0]; e.getElementById(n) || (s = e.createElement(t), s.id = n, s.async = !0, s.src = "https://widget.zola.com/js/widget.js", a.parentNode.insertBefore(s, a)) }(document, "script", "zola-wjs");
});
</script>

<template>
    <div>
        <Navigation />

        <div class="mt-18 py-8 px-4 lg:px-40 w-full text-center">
            <h1 class="font-serif font-medium text-5xl leading-loose">Registry</h1>
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <span class="lg:col-start-2 lg:col-span-3">
                    Hello friends and family, we’re excited to see you on our big day! In lieu of traditional gifts, we’ve
                    opted
                    for a house and honeymoon fund registry to kickstart the next chapter of our lives. If you’re able, we
                    are
                    so grateful for your contribution to this dream of ours!
                </span>
                <span class="lg:col-start-2 lg:col-span-3">
                    While you can contribute through our online registry, we will also have a wishing well card box at our
                    reception if you’d prefer to give a gift in-person (and avoid the transaction fee).

                </span>
            </div>
        </div>
        <div>
            <a class="zola-registry-embed" href="https://www.zola.com/registry/na-and-richard"
                data-registry-key="na-and-richard">Our registry</a>
        </div>
    </div>
</template>