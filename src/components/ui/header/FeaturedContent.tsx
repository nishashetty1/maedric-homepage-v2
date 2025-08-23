import React from "react";
import Link from "next/link";
import { Button, Typography } from "@/components/ui";

interface FeaturedContentProps {
    content: {
        description: string;
        secondParagraph: string;
        thirdParagraph?: string;
        buttonLabel: string;
        buttonLink: string;
    };
    isMobile?: boolean;
    onButtonClick?: () => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
    content,
    isMobile = false,
    onButtonClick
}) => {
    return (
        <div className={isMobile ? "px-2" : "px-4"}>
            <Typography as="body" align="left" className="mb-3 text-sm">
                {content.description}
            </Typography>
            <Typography as="body" align="left" className="mb-3 text-sm">
                {content.secondParagraph}
            </Typography>
            {!isMobile && content.thirdParagraph && (
                <Typography as="body" align="left" className="mb-4 text-sm">
                    {content.thirdParagraph}
                </Typography>
            )}
            <Link href={content.buttonLink} onClick={onButtonClick}>
                <Button variant="outlined" className="!py-2 !px-8 text-sm">
                    {content.buttonLabel}
                </Button>
            </Link>
        </div>
    );
};

export default FeaturedContent;