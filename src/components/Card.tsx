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
    buttonIcon?: React.ReactNode;
    buttonHref?: string;
    onButtonClick?: () => void;
    buttonDownload?: string;
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
                                       buttonIcon,
                                       buttonHref,
                                       onButtonClick,
                                       buttonDownload,
                                       variant = 'default',
                                       interactive = false,
                                       className = "",
                                       children
                                   }) => {
    let cardClasses =
        "flex flex-col rounded-xl overflow-hidden transition-all duration-300 ease-out";

    if (variant === "elevated") {
        cardClasses += " card-modern hover:shadow-glow-primary";
    } else if (variant === "outline") {
        cardClasses +=
            " bg-transparent border-2 border-border hover:border-accent hover:shadow-glow-accent";
    } else if (variant === "glass") {
        cardClasses +=
            " card-glass hover:border-accent/60 hover:bg-glass/80";
    } else {
        cardClasses +=
            " bg-card border border-border shadow-card hover:shadow-hover hover:border-accent/50";
    }

    if (interactive) {
        cardClasses += " hover:-translate-y-1";
    }

    if (className) {
        cardClasses += " " + className;
    }

    const ButtonElement = buttonHref ? "a" : "button";

    return (
        <div className={cardClasses + " group"}>
            <div className="p-4 md:p-5 flex-grow flex flex-col">
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
                                <h3
                                    className="text-lg font-bold text-foreground group-hover:text-accent
                                                transition-colors duration-300"
                                >
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
                                {descriptionIcon && (
                                    <div className="flex-shrink-0 mt-1">
                                        {descriptionIcon}
                                    </div>
                                )}
                                <p className="text-slate-400 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow">{children}</div>

                {(buttonText || onButtonClick) && (
                    <div className="mt-auto pt-6">
                        <ButtonElement
                            className="btn-card-modern group/btn"
                            href={buttonHref}
                            onClick={onButtonClick}
                            {...(buttonHref && buttonDownload
                                ? { download: buttonDownload }
                                : {})} // Apply filename only if provided
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="btn-content">
                                {buttonIcon && (
                                    <span className="btn-icon">
                                        {buttonIcon}
                                    </span>
                                )}
                                <span className="btn-text">
                                    {buttonText || "Learn More"}
                                </span>
                            </span>
                            <div className="btn-glow"></div>
                        </ButtonElement>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
