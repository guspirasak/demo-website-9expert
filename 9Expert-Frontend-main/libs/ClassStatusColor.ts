

export const ClassStatusColor = (status: string) => {

    if (status) {
        switch (status.toLowerCase()) {
        case 'open':
            return '#36B37E'
        case 'almost full':
            return '#FEC84B'
        case 'full':
            return '#F65A5A'
        default:
            return '#36B37E'
        }
    } else {
        return '#36B37E'
    }
}