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
                // Log trạng thái ban đầu
                const style = window.getComputedStyle(chatWindow);
                console.log(style.display === 'none' ? 'đang ẩn' : 'đang hiển thị');

                // Tạo MutationObserver để theo dõi thay đổi thuộc tính style
                const observer = new MutationObserver(() => {
                    const currentDisplay = window.getComputedStyle(chatWindow).display;
                    const iframeElement = document.querySelector('.iframe-ai-agent');
                
                    // if (!iframeElement) return;
                
                    if (currentDisplay === 'none') {
                        console.log('đang ẩn');
                        iframeElement.style.height = '10%';
                    } else {
                        console.log('đang hiển thị');
                        iframeElement.style.height = '100%';
                    }
                });
                

                observer.observe(chatWindow, {
                    attributes: true,
                    attributeFilter: ['style'],
                });

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
