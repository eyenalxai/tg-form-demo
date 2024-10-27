import { DefaultForm } from "@/components/default-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function Page() {
	return (
		<div className={cn("w-full", "flex", "justify-center")}>
			<Dialog>
				<DialogTitle className={cn("hidden")}>Form</DialogTitle>
				<Button asChild>
					<DialogTrigger>Show Form</DialogTrigger>
				</Button>
				<DialogContent className={cn("top-48", "max-w-sm", "p-1", "rounded-md")}>
					<ScrollArea className={cn("h-80", "rounded", "p-1", "pr-4")}>
						<DefaultForm className={cn("px-1")} />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</div>
	)
}
