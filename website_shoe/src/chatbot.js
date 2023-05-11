import React, { useEffect } from "react";
function KommunicateChat() {
  useEffect(() => {
    
  
    (function (d, m) {
      var kommunicateSettings = {
        appId: "d6af1953f96aea46cd3d04b04d521b54",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);
  return <div></div>;
}

export default KommunicateChat;