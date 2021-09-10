import React, { useState } from 'react';
 
function Greeting(props) {
    const [greeting, setGreeting] = useState("");
 
    const sendGreetings = () => {
        window.fetch('/greeting/hello')
            .then(response => response.json())
            .then(resp => setGreeting(resp))
            .catch(err => console.log(err));
    }
    return 	<>
				<div
					style={{ flexDirection: 'column', height: '100vh',
							display: 'flex', alignItems: 'center',
							justifyContent: 'center' }}>
					<div><button onClick={sendGreetings}>Send Greetings</button></div>
					{greeting && <div>{`${greeting}`}</div>}
				</div>
			</>
}
export default Greeting;