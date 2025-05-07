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

    return <></>;
}

export default App;
