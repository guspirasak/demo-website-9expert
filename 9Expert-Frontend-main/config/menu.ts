import { facebookUrl } from "./contact"
import { promotioTitle } from "./promotion"

export const contactUsMenu = [
    {
        id: 1,
        label: "แผนที่และการเดินทาง",
        href: "/contact-us"
    },
    {
        id: 2,
        label: "Facebook",
        href: facebookUrl
    },
    {
        id: 3,
        label: "คำถามที่พบบ่อย",
        href: "/faq"
    },
    {
        id: 4,
        label: "เกี่ยวกับเรา",
        href: "/about-us"
    },
    {
        id: 5,
        label: "ร่วมงานกับเรา",
        href: "/join-us"
    }
]

export const promotionMenu = [
    {
        label: promotioTitle,
        href: "/promotion"
    }
]