type Props = {
    value: number | string | null | undefined,
    label: string
}


const MetricCard = (props: Props) => {
    const { value, label } = props
    return (
        <div>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
};


export default MetricCard