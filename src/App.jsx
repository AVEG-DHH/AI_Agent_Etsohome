import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './App.css';

function App() {
    useEffect(() => {
        const chatBox = createChat({
            webhookUrl: 'https://nightfurys.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat',
        });

        chatBox.on('open', () => {
            window.parent.postMessage({ type: 'CHATBOX_OPEN' }, '*');
        });

        chatBox.on('close', () => {
            window.parent.postMessage({ type: 'CHATBOX_CLOSED' }, '*');
        });

        return () => {
            chatBox.off('open');
            chatBox.off('close');
        };
    }, []);

    return null;
}

export default App;