'use client';

interface PaperTextureProps {
    variant?: 'warm' | 'cool' | 'aged';
    children: React.ReactNode;
    className?: string;
    as?: 'section' | 'div' | 'article' | 'footer' | 'header';
}

const variantClass = {
    warm: 'paper-warm',
    cool: 'paper-cool',
    aged: 'paper-aged',
};

export default function PaperTexture({
    variant = 'warm',
    children,
    className = '',
    as: Tag = 'section'
}: PaperTextureProps) {
    return (
        // @ts-ignore — dynamic tag
        <Tag className={`${variantClass[variant]} ${className}`}>
            {children}
        </Tag>
    );
}
