type Props = {
    message: string,
    type: 'error' | 'success' | 'warning'
}

export type {Props as ScreenMessageProps};

export default function ScreenMessage({ type, message }: Props) {

    const bgColor = type === 'error' ? '#cc5858' : type === 'success' ? '#245b24' : '#f1ca09';

    return (
        <div style={{backgroundColor: bgColor}} className={` p-2.5 top-0 left-0 w-full fixed z-50 text-white`}>
            {message}
        </div>
    )
}