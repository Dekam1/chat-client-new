import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

export default function JoinButton({ disabled }) {
	return (
		<Button
			disabled={!disabled}
			htmlType='submit'
			icon={<CommentOutlined />}>
			Присоединиться
		</Button>
	);
};