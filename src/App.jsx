import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

import './App.css';

function App() {
    useEffect(() => {
        createChat({
            webhookUrl: 'https://nightfurys.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat',
        });
    }, []);

    useEffect(() => {
        const checkAndObserve = () => {
            const chatWindow = document.querySelector('.chat-window');

            if (chatWindow) {
                const observer = new MutationObserver(() => {
                    const currentDisplay = window.getComputedStyle(chatWindow).display;

                    if (currentDisplay === 'none') {
                        window.parent.postMessage({ type: 'chat-visibility', state: 'hidden' }, '*');
                    } else {
                        window.parent.postMessage({ type: 'chat-visibility', state: 'visible' }, '*');
                    }
                });

                observer.observe(chatWindow, { attributes: true, attributeFilter: ['style'] });

                return observer;
            } else {
                // Nếu chưa có chatWindow, thử lại sau 500ms
                setTimeout(checkAndObserve, 500);
            }
        };

        const observer = checkAndObserve();

        return () => {
            if (observer && observer.disconnect) observer.disconnect();
        };
    }, []);

    return <></>;
}

export default App;
