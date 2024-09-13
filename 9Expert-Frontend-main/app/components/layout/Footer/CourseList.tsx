import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { SimpleGrid, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useSelector } from "react-redux"

const CourseList = () => {
    const courseGroup = useSelector(getCourseGroup)
    
    return (
        <SimpleGrid w="100%" columns={2} alignSelf={{ base: 'center', lg: 'start' }} spacingY="1.25rem" as="ul">
            {courseGroup.map((item: TCourseGroup, index: number) => (
                <Text
                    key={index}
                    as={Link}
                    _hover={{ textDecoration: 'underline' }}
                    href={`/group/${item.courseGroupName}`}
                    fontSize="sm"
                >
                    {item.courseGroupName}
                </Text>
            ))}
        </SimpleGrid>
    )
}

export default CourseList