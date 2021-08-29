//Author - Zongyu wu
import LexChat from "react-lex";

function Chatbot() {
    return (
        <div>
            <LexChat
                botName="Navigation"
                IdentityPoolId="us-east-1:490d8d9b-4877-4f91-a06d-aee20121e312"
                placeholder="Placeholder text"
                style={{ position: 'absolute' }}
                backgroundColor="#FFFFFF"
                height="430px"
                region="us-east-1"
                headerText="Chat with our awesome bot" />
        </div>
    )
}

export default Chatbot;