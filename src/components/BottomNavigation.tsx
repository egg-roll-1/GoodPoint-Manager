import { Flex, Text } from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"
import { HomeIcon } from "lucide-react"

export const BottomNavigation = () => {
    return <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md shadow">
        <div className="flex justify-around">
            <Link to="/" className="p-2">
                <Flex direction={'column'} align={'center'}>
                    <HomeIcon />
                    <Text size={'2'}>
                        홈
                    </Text>
                </Flex>
            </Link>
            <Link to="/" className="p-2">
                <Flex direction={'column'} align={'center'}>
                    <HomeIcon />
                    <Text size={'2'}>
                        홈
                    </Text>
                </Flex>
            </Link>
            <Link to="/" className="p-2">
                <Flex direction={'column'} align={'center'}>
                    <HomeIcon />
                    <Text size={'2'}>
                        홈
                    </Text>
                </Flex>
            </Link>
            <Link to="/" className="p-2">
                <Flex direction={'column'} align={'center'}>
                    <HomeIcon />
                    <Text size={'2'}>
                        홈
                    </Text>
                </Flex>
            </Link>
        </div>
    </div>
}