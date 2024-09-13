export type TLiveTab = {
    children: React.ReactNode
    leftIcon?: JSX.Element
    target?: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>>
    image?: string
}

export type TLiveRef = {
    benefit: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
    objective: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
    requirement: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
    topic: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
    roadmap?: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
    related: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
    note: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>> | null
}