import './Button.css';

interface ButtonProps {
	text: string;
	onClick: Function;
	onClickParams?: any;
	isDisabled?: boolean;
}

export default function Button(props: ButtonProps) {
	return (
		<button
			className='button'
			onClick={() => props.onClick(props.onClickParams)}
			disabled={props.isDisabled}>
			{props.isDisabled ? (
				<div className='loader' />
			) : (
				<span>{props.text}</span>
			)}
		</button>
	);
}
