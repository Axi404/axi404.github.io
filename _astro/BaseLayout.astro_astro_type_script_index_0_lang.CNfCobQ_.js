(()=>{const i="axi-blog-graphics-warning-shown",s="axi-blog-webgl-support",m="1.0";function f(){const e=window.location.pathname;return e.includes("/en/")||e.endsWith("/en")?"en":"zh"}const l={zh:{webglError:{title:"浏览器兼容性提醒",content:`
                  <strong>您的浏览器不支持 WebGL 技术</strong>，可能会影响网站的某些功能体验。
                  
                  <ul class="graphics-warning-list">
                    <li>更新到最新版本的现代浏览器（Chrome、Firefox、Edge、Safari）</li>
                    <li>确保您的设备支持硬件加速</li>
                    <li>如果使用的是较老的设备，建议升级浏览器版本</li>
                  </ul>
                `},performanceWarning:{title:"性能优化建议",content:`
                  <strong>检测到您的浏览器可能未启用硬件加速</strong>，这可能会影响网页性能和视觉效果。开启硬件加速通常<strong>不会导致性能开销明显增加</strong>，但是可能可以显著提升网页的渲染速度与浏览体验。
                  
                  <ul class="graphics-warning-list">
                    <li><strong>Chrome:</strong> 设置 → 系统 → 使用图形加速功能（如果可用）</li>
                    <li><strong>Firefox:</strong> 设置 → 常规 → 性能 → 使用推荐的性能设置 → 自动启用硬件加速</li>
                    <li><strong>Edge:</strong> 设置 → 系统和性能 → 图形加速 → 在可用时使用图形加速</li>
                    <li>重启浏览器让设置生效</li>
                  </ul>
                  
                  <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
                    💡 如果您的设备较老或不支持硬件加速，网站仍可正常使用。
                  </p>
                `},button:"我知道了"},en:{webglError:{title:"Browser Compatibility Notice",content:`
                  <strong>Your browser does not support WebGL technology</strong>, which may affect some website features and experience.
                  
                  <ul class="graphics-warning-list">
                    <li>Update to the latest version of modern browsers (Chrome, Firefox, Edge, Safari)</li>
                    <li>Ensure your device supports hardware acceleration</li>
                    <li>For older devices, consider upgrading your browser version</li>
                  </ul>
                `},performanceWarning:{title:"Performance Optimization Suggestion",content:`
                  <strong>Hardware acceleration may not be enabled in your browser</strong>, which could affect web performance and visual effects. Enabling hardware acceleration typically <strong>does not significantly increase performance overhead</strong>, but can significantly improve web rendering speed and browsing experience.
                  
                  <ul class="graphics-warning-list">
                    <li><strong>Chrome:</strong> Settings → System → Use hardware acceleration when available</li>
                    <li><strong>Firefox:</strong> Settings → General → Performance → Use recommended performance settings → Enable hardware acceleration</li>
                    <li><strong>Edge:</strong> Settings → System and performance → Use hardware acceleration when available</li>
                    <li>Restart your browser for settings to take effect</li>
                  </ul>
                  
                  <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
                    💡 If your device is older or doesn't support hardware acceleration, the website will still work normally.
                  </p>
                `},button:"Got it"}};function x(){try{return localStorage.getItem(i)==="true"}catch{return!1}}function d(){try{const e=localStorage.getItem(s);if(!e)return null;const t=JSON.parse(e),n=Date.now();return t.version!==m||n-t.timestamp>6048e5?(localStorage.removeItem(s),null):t}catch{return null}}function w(e){try{const t={...e,timestamp:Date.now(),version:m};localStorage.setItem(s,JSON.stringify(t))}catch{}}function g(){try{localStorage.setItem(i,"true")}catch{}}function b(){const e=document.createElement("canvas"),t=e.getContext("webgl",{failIfMajorPerformanceCaveat:!0})||e.getContext("experimental-webgl",{failIfMajorPerformanceCaveat:!0});return e.getContext("webgl")||e.getContext("experimental-webgl")?t?{webglSupported:!0,hardwareAccelerated:!0}:{webglSupported:!0,hardwareAccelerated:!1}:{webglSupported:!1,hardwareAccelerated:!1}}function y(){const e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)return null;const n=t,r=n.getExtension("WEBGL_debug_renderer_info");if(r){const a=n.getParameter(r.UNMASKED_RENDERER_WEBGL),o=n.getParameter(r.UNMASKED_VENDOR_WEBGL);return{isSoftwareRenderer:["swiftshader","software","mesa","llvmpipe","microsoft basic render"].some(p=>a.toLowerCase().includes(p)),renderer:a,vendor:o}}return null}function E(e,t,n="warning"){const r=f(),a=l[r].button,o=document.createElement("div");o.className="graphics-warning-overlay";const c=document.createElement("div");c.className="graphics-warning-dialog";const C=n==="error"?"graphics-warning-icon error":"graphics-warning-icon",p=n==="error"?"🚫":"⚠️";c.innerHTML=`
            <div class="graphics-warning-header">
              <div class="${C}">${p}</div>
              <h3 class="graphics-warning-title">${e}</h3>
            </div>
            <div class="graphics-warning-content">
              ${t}
            </div>
            <div class="graphics-warning-actions">
              <button class="graphics-warning-btn" onclick="this.closest('.graphics-warning-overlay').remove(); localStorage.setItem('${i}', 'true')">
                ${a}
              </button>
            </div>
          `,o.appendChild(c),document.body.appendChild(o),o.addEventListener("click",h=>{h.target===o&&(g(),o.remove())});const k=h=>{h.key==="Escape"&&(g(),o.remove(),document.removeEventListener("keydown",k))};document.addEventListener("keydown",k),g()}function I(){const e=d();if(!e)return!1;const t=document.getElementById("gradient-background");if(!t)return!0;if(!e.webglSupported||!e.hardwareAccelerated)t.style.display="none",t.style.opacity="0";else{t.style.display="block",t.style.opacity="1";const n=document.createElement("style");n.textContent=`
              header-component.not-top {
                background-color: hsl(var(--background) / 0.0) !important;
              }
              .dark header-component.not-top {
                background-color: hsl(var(--muted) / 0.0) !important;
              }
            `,document.head.appendChild(n)}return!0}function L(){try{const e=b(),t=y();w({webglSupported:e.webglSupported,hardwareAccelerated:e.hardwareAccelerated&&!(t&&t.isSoftwareRenderer)});const n=d();n&&(!n.webglSupported||!n.hardwareAccelerated?u():v())}catch{}}function A(){if(!x())try{const e=f(),t=b(),n=y();if(w({webglSupported:t.webglSupported,hardwareAccelerated:t.hardwareAccelerated&&!(n&&n.isSoftwareRenderer)}),t.webglSupported)if(!t.hardwareAccelerated||n&&n.isSoftwareRenderer){u();const r=l[e].performanceWarning;E(r.title,r.content,"warning")}else v();else{u();const r=l[e].webglError;E(r.title,r.content,"error")}}catch{}}function v(){const e=document.getElementById("gradient-background");e&&(e.style.display="block",e.style.opacity="1");const t=document.createElement("style");t.textContent=`
            header-component.not-top {
              background-color: hsl(var(--background) / 0.0) !important;
            }
            .dark header-component.not-top {
              background-color: hsl(var(--muted) / 0.0) !important;
            }
          `,document.head.appendChild(t)}function u(){const e=document.getElementById("gradient-background");e&&(e.style.opacity="0",setTimeout(()=>{e.style.display="none"},1e3))}const W=!!d();function S(){W?(I(),setTimeout(L,1500)):setTimeout(A,1500)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",S):S()})();
