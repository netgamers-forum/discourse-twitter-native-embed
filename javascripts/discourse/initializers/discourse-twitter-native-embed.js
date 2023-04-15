import { withPluginApi } from "discourse/lib/plugin-api";


export default {
    name: "discourse-twitter-native-embed",
    initialize() {
        withPluginApi("1.0.0", api => {
            
            function getTwitterScript() {
                var scriptnode = document.createElement('script'); 
                scriptnode.setAttribute("async", "")
                scriptnode.setAttribute("src", "https://platform.twitter.com/widgets.js");
                scriptnode.setAttribute("charset", "utf-8");
                document.head.appendChild(scriptnode);
            }
            
            api.decorateCookedElement((el, helper) => {
                let hasQuote = false;
                for (const aa of el.querySelectorAll(`a.onebox[href^="https://twitter.com/"][href*=status]`)) {
                    const twitter_blockquoue = document.createElement("blockquote");
                    twitter_blockquoue.setAttribute("style", "display: none");
                    const aaa = document.createElement("a");
                    aaa.setAttribute("href", aa.href);
                    aaa.setAttribute("rel", "no-follow");
                    twitter_blockquoue.appendChild(aaa);
                    aa.appendChild(twitter_blockquoue);
                }
                for (const quote of el.getElementsByTagName("blockquote")) {
                    if (quote.querySelector(`blockquote a[href^="https://twitter.com/"]`)) {
                        quote.classList += "twitter-tweet";
                        hasQuote = true;
                    }
                }
                if (hasQuote) getTwitterScript();
            }, {
                id: "discourse-twitter-native-embed",
                afterAdopt: true,
                onlyStream: true,
            });

        });
    }
};

