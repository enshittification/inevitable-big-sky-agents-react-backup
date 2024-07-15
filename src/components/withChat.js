// simple wrapper for demo components so their chat histories are isolated
import { ChatProvider } from '@automattic/big-sky-agents';

const withChat = (ChildComponent) => {
	const WithChat = (props) => (
		<ChatProvider>
			<ChildComponent {...props} />
		</ChatProvider>
	);

	return WithChat;
};

export default withChat;
