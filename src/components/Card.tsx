import * as React from "react";

interface CardProps {
    title?: string;
    titleIcon?: React.ReactNode;
    subtitle?: string;
    subtitleIcon?: React.ReactNode;
    description?: string;
    descriptionIcon?: React.ReactNode;
    image?: string;
    imageAlt?: string;
    buttonText?: string;
    buttonHref?: string;
    onButtonClick?: () => void;
    variant?: 'default' | 'elevated' | 'outline' | 'glass';
    interactive?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
                                       title,
                                       titleIcon,
                                       subtitle,
                                       subtitleIcon,
                                       description,
                                       descriptionIcon,
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
    // Base classes - Modern card foundation
    let cardClasses = "flex flex-col rounded-xl overflow-hidden transition-all duration-300 ease-out";

    // Variant styles - Modern and portfolio-tailored
    if (variant === 'elevated') {
        cardClasses += " card-modern hover:shadow-glow-primary";
    } else if (variant === 'outline') {
        cardClasses += " bg-transparent border-2 border-border hover:border-accent hover:shadow-glow-accent";
    } else if (variant === 'glass') {
        cardClasses += " card-glass hover:border-accent/60 hover:bg-glass/80";
    } else {
        cardClasses += " bg-card border border-border shadow-card hover:shadow-hover hover:border-accent/50";
    }

    // Interactive styles - Enhanced modern effects
    if (interactive) {
        cardClasses += " hover:-translate-y-1";
    }

    // Add custom classes
    if (className) {
        cardClasses += " " + className;
    }

    const ButtonElement = buttonHref ? 'a' : 'button';

    return (
        <div className={cardClasses + " group"}>
            <div className="p-4 md:p-5 flex-grow">
                <div className="flex gap-4 mb-4">
                    {image && (
                        <div className="flex-shrink-0">
                            <img
                                className="w-16 h-16 object-contain bg-white rounded-xl p-2"
                                src={image}
                                alt={imageAlt}
                            />
                        </div>
                    )}

                    <div className="flex-1">
                        {title && (
                            <div className="flex items-center gap-2 mb-2">
                                {titleIcon && titleIcon}
                                <h3 className="text-lg font-bold text-foreground group-hover:text-accent
                                                transition-colors duration-300">
                                    {title}
                                </h3>
                            </div>
                        )}

                        {subtitle && (
                            <div className="flex items-center gap-2 mb-2">
                                {subtitleIcon && subtitleIcon}
                                <p className="text-xs font-medium uppercase text-slate-400 tracking-wide">
                                    {subtitle}
                                </p>
                            </div>
                        )}

                        {description && (
                            <div className="flex items-start gap-2">
                                {descriptionIcon && <div className="flex-shrink-0 mt-1">{descriptionIcon}</div>}
                                <p className="text-slate-400 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {children}

                {(buttonText || onButtonClick) && (
                    <ButtonElement
                        className="inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border
                                    border-transparent bg-primary text-primary-foreground hover:bg-primary/90
                                    focus:outline-none focus:bg-primary/90 disabled:opacity-50
                                    disabled:pointer-events-none px-4 py-2 mt-4 transition-colors duration-200"
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