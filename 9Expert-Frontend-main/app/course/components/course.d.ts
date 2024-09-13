export  type TFilterButtonProps = {
    children: React.ReactNode
    display?: ResponsiveValue<Property.Display>
    onClick?: () => void
    isActive?: boolean
}

export type TFilterButtonGroup = {
    children: React.ReactNode
    textColor?: string
    activeTextColor?: string
    bgColor?: string
    activeBgColor?: string
}

export type TFilterCheckBox = {
    children: React.ReactNode
    display?: ResponsiveValue<Property.Display>
    onChange?: () => void
    isChecked?: boolean
}