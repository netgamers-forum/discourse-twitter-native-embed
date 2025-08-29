import {
    withPluginApi
} from "discourse/lib/plugin-api";


export default {
    name: "discourse-twitter-native-embed-xcancel",
    initialize() {
        withPluginApi("1.0.0", api => {
/*
            function getTwitterScript() {
                var scriptnode = document.createElement('script');
                scriptnode.setAttribute("async", "");
                scriptnode.setAttribute("src", "https://platform.twitter.com/widgets.js");
                scriptnode.setAttribute("charset", "utf-8");
                document.head.appendChild(scriptnode);
            }
*/
            api.decorateCookedElement((el, helper) => {
//                let hasQuote = false;
                for (const the_musks_fxxking_url of ["twitter.com", "x.com"]) {
                    for (const aa of el.querySelectorAll(`aside.onebox[data-onebox-src^="https://${the_musks_fxxking_url}/"][data-onebox-src*=status]`)) {
                        const xcancel_link = aa;
                        console.log(aa.getAttribute("data-onebox-src"));
                        xcancel_link.setAttribute("data-onebox-src", aa.getAttribute("data-onebox-src").replaceAll(/^https:\/\/.+\.com/gi, "https://xcancel.com"));
                        xcancel_link.textContent = aa.textContent.replaceAll(/^https:\/\/.+\.com/gi, "https://xcancel.com")
                        xcancel_link.setAttribute("rel", "no-follow");
                    }
                }
//                for (const quote of el.getElementsByTagName("blockquote")) {
//                    if (quote.querySelector(`blockquote a[href^="https://twitter.com/"]`)) {
//                        quote.classList?.add("twitter-tweet");
//                        hasQuote = true;
//                    }
//               }
//                if (hasQuote) getTwitterScript();
            }, {
                id: "discourse-twitter-native-embed-xcancel",
                afterAdopt: true,
                onlyStream: true
            });
        });
    }
};
