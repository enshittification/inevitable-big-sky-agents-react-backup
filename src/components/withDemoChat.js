import {
	ChatModelService,
	ChatModelType,
	ChatProvider,
} from '@automattic/big-sky-agents';

const withDemoChat = (ChildComponent) => {
	const WithDemoChat = ({ apiKey, ...props }) => (
		<ChatProvider
			apiKey={apiKey}
			feature="big-sky"
			service={ChatModelService.OPENAI}
			model={ChatModelType.GPT_4O}
		>
			<ChildComponent {...props} />
		</ChatProvider>
	);

	return WithDemoChat;
};

export default withDemoChat;
