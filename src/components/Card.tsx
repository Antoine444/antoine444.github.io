import * as React from "react";

interface CardProps {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    buttonText?: string;
    buttonHref?: string;
    onButtonClick?: () => void;
    variant?: 'default' | 'elevated' | 'outline';
    interactive?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
                                       title,
                                       subtitle,
                                       description,
                                       image,
                                       imageAlt = "Card image",
                                       buttonText,
                                       buttonHref,
                                       onButtonClick,
                                       variant = 'default',
                                       interactive = false,
                                       className = "",
                                       children
                                   }) => {
    // Base classes
    let cardClasses = "flex flex-col rounded-xl overflow-hidden transition-all duration-300";

    // Variant styles
    if (variant === 'elevated') {
        cardClasses += " bg-card shadow-lg hover:shadow-xl border-0";
    } else if (variant === 'outline') {
        cardClasses += " bg-transparent border-2 border-border hover:border-accent";
    } else {
        cardClasses += " bg-card border border-border shadow-sm hover:shadow-md";
    }

    // Interactive styles
    if (interactive) {
        cardClasses += " hover:scale-[1.02] cursor-pointer";
    }

    // Add custom classes
    if (className) {
        cardClasses += " " + className;
    }

    const ButtonElement = buttonHref ? 'a' : 'button';

    return (
        <div className={cardClasses}>
            <div className="p-4 md:p-5 flex-grow">
                {image && (
                    <div className="mb-4">
                        <img
                            className="w-16 h-16 object-contain bg-white rounded-xl p-2"
                            src={image}
                            alt={imageAlt}
                        />
                    </div>
                )}

                {title && (
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        {title}
                    </h3>
                )}

                {subtitle && (
                    <p className="text-xs font-medium uppercase text-muted-foreground mb-2 tracking-wide">
                        {subtitle}
                    </p>
                )}

                {description && (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        {description}
                    </p>
                )}

                {children}

                {(buttonText || onButtonClick) && (
                    <ButtonElement
                        className="inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 mt-4 transition-colors duration-200"
                        href={buttonHref}
                        onClick={onButtonClick}
                    >
                        {buttonText || "Learn More"}
                    </ButtonElement>
                )}
            </div>
        </div>
    );
};

export default Card;