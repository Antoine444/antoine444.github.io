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
    id?: string; // Added to identify unique cards
}

// Context to manage active card state
const ActiveCardContext = React.createContext<{
    activeCardId: string | null;
    setActiveCardId: (id: string | null) => void;
}>({
    activeCardId: null,
    setActiveCardId: () => {},
});

// Provider component to wrap multiple cards
export const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeCardId, setActiveCardId] = React.useState<string | null>(null);

    return (
        <ActiveCardContext.Provider value={{ activeCardId, setActiveCardId }}>
            {children}
        </ActiveCardContext.Provider>
    );
};

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
                                       variant = "default",
                                       interactive = false,
                                       className = "",
                                       children,
                                       id,
                                   }) => {
    const { activeCardId, setActiveCardId } = React.useContext(ActiveCardContext);
    const cardId = React.useRef(id || `card-${Math.random().toString(36).substr(2, 9)}`).current;
    const isActive = activeCardId === cardId;

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't trigger card activation if clicking on button
        if ((e.target as HTMLElement).closest('button, a')) {
            return;
        }

        if (isActive) {
            setActiveCardId(null); // Deactivate if clicking the same card
        } else {
            setActiveCardId(cardId); // Activate this card
        }
    };

    let cardClasses =
        "flex flex-col rounded-xl overflow-hidden transition-all duration-300 ease-out cursor-pointer";

    if (variant === "elevated") {
        cardClasses += isActive
            ? " card-modern shadow-glow-primary"
            : " card-modern hover:shadow-glow-primary";
    } else if (variant === "outline") {
        cardClasses += isActive
            ? " bg-transparent border-2 border-accent shadow-glow-accent"
            : " bg-transparent border-2 border-border hover:border-accent hover:shadow-glow-accent";
    } else if (variant === "glass") {
        cardClasses += isActive
            ? " card-glass border-accent/60 bg-glass/80"
            : " card-glass hover:border-accent/60 hover:bg-glass/80";
    } else {
        cardClasses += isActive
            ? " bg-card border border-accent/50 shadow-hover"
            : " bg-card border border-border shadow-card hover:shadow-hover hover:border-accent/50";
    }

    if (interactive) {
        cardClasses += isActive
            ? " -translate-y-1"
            : " hover:-translate-y-1 active:scale-95";
    }

    if (className) {
        cardClasses += " " + className;
    }

    const ButtonElement = buttonHref ? "a" : "button";

    return (
        <div className={cardClasses + " group"} onClick={handleCardClick}>
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
                                    className={`text-lg font-bold transition-colors duration-300 ${
                                        isActive
                                            ? "text-accent"
                                            : "text-foreground group-hover:text-accent"
                                    }`}
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
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                onButtonClick?.();
                            }}
                            {...(buttonHref && buttonDownload
                                ? { download: buttonDownload }
                                : {})}
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