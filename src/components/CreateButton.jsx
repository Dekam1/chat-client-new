import { Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';

export default function CreateButton({ disabled }) {
	return (
		<Button
			disabled={!disabled}
			htmlType='submit'
			icon={<HighlightOutlined />}>
			Создать
		</Button>
	);
};