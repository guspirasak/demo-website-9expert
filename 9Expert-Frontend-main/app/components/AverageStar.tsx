import { StarIcon } from "@/app/icons/AdminIcon"
import { HStack, IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const AverageStars = (rate: number | string, size?: string | number, emptyBg?: string) => {

    const rating = Number(rate)

    return Array.from({ length: 5 }, (_, index) => {

        const fullStars = Math.floor(rating)
        const halfStar = rating % 1

        if (index + 1 <= rating) {
            return <StarIcon key={index} w={size} h={size} color="exStarYellow" />
        } else if ((halfStar >= 0.5) && (index == fullStars)) {
            return <StarIcon key={index} w={size} h={size} color="exStarYellow" />
        } else {
            return <StarIcon key={index} w={size} h={size} opacity='0.2' color={emptyBg || 'blackAlpha.300'} />
        }
    })
}

export const SetAverageStars = ({ setRating, rating }: { setRating: (rating: number) => void, rating?: number }) => {
    
    const [ state, setState ] = useState({ rating: rating || 0, hover: 0 })

    useEffect(() => {
        setRating(state.rating)
    }, [state.rating])

    return (
        <HStack spacing='0'>
            {[...Array(5)].map((_, i) => {
                i += 1
                return (
                    <IconButton
                        aria-label={`star${i}`}
                        key={i}
                        variant='ghost'
                        color='blackAlpha.500'
                        icon={i <= (state.hover || state.rating) ? <StarIcon color='exStarYellow' w='30px' h='30px' /> : <StarIcon color='#F3B411' opacity='0.2' w='30px' h='30px' />}
                        onClick={() => setState(prevState => ({ ...prevState, rating: i }))}
                        onMouseEnter={() => setState(prevState => ({ ...prevState, hover: i }))}
                        onMouseLeave={() => setState(prevState => ({ ...prevState, hover: state.rating }))}
                        _hover={{
                            bg: 'trasnparent'
                        }}
                    />
                )
            })}
        </HStack>
    )
}