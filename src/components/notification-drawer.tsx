"use client"

import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from "@/components/ui/drawer"
import { drawer } from "@/lib/drawer"

export const NotificationDrawer = () => {
	const { isOpen, setIsOpen } = drawer()

	return (
		<Drawer
			open={isOpen}
			onOpenChange={(isOpen) => setIsOpen(isOpen)}
			setBackgroundColorOnScale={false}
			shouldScaleBackground={false}
		>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Form Submitted!</DrawerTitle>
					<DrawerDescription>
						Hooray! You&#39;ve successfully submitted the form. Loooong text here to pad the drawer and see how it looks
						with a lot of text. Again, loooong text here to pad the drawer and see how it looks with a lot of text.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
