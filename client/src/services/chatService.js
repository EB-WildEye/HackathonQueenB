import api from'./api';

const sendUserInput = async (message) => {
        try {
            const res = await api.post('/api/chat/message', {message} );
            console.log('client: inside sendUserInput func');
            console.log(res.data);
            return res;
        } catch (error) {
            console.error("Error fetching the chat's reponse:", error);
        }
};

export default sendUserInput;