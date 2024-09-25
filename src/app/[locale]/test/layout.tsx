import { type PropsWithChildren } from 'react';

const TestLayout = ({ children }: PropsWithChildren) => (
    <div className="relative mx-auto flex h-screen max-w-lg items-center">{children}</div>
);

export default TestLayout;
