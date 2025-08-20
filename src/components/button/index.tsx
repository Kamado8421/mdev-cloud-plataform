type Props = {
    title: string;
    gradient?: boolean;
    styles?: React.CSSProperties;
    tailwind?: string;
    onClick: () => void;
};

export default function Button({ title, gradient, tailwind, styles, onClick }: Props) {
    return (
        <button
            onClick={() => onClick()}
            style={styles}
            className={`${gradient ? 'my-bg-button' : 'bg-[#b603ff]'} text-white font-semibold cursor-pointer click-point p-2.5 w-full rounded-md ${tailwind ? tailwind : ''}`}>
            {title}
        </button>
    )
}
