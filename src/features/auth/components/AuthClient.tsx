'use client';

import { type MouseEventHandler, useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import AuthFooter from './AuthFooter';
import AuthFormSkeleton from './skeletons/AuthFormSkeleton';
import OAuthSignInSkeleton from './skeletons/OAuthSignInSkeleton';
import { login } from '../services/login';
import { register } from '../services/register';
import { validateEmail } from '../services/validateEmail';

const LazyOAuthSignIn = dynamic(() => import('./OAuthSignIn'), {
  loading: () => <OAuthSignInSkeleton />,
});

const LazyLoginForm = dynamic(() => import('../forms/LoginForm'), {
  loading: () => <AuthFormSkeleton />,
});

const LazyRegisterForm = dynamic(() => import('../forms/RegisterFormTest'), {
  loading: () => <></>,
});

type AuthFormSwitch = {
  callToAction: string;
  question: string;
  onClick: () => void;
};

const AuthFormSwitch = ({ callToAction, question, onClick }: AuthFormSwitch) => (
  <div className="flex justify-center gap-2 px-2.5 text-sm ">
    <div className="text-muted-foreground">{question}</div>
    <button className="cursor-pointer underline" onClick={onClick}>
      {callToAction}
    </button>
  </div>
);

const Header = ({
  header,
  description,
  cta,
  onClick,
}: {
  header: string;
  description: string;
  cta: string;
  onClick: MouseEventHandler;
}) => (
  <div className="flex flex-col space-y-2 px-1.5 pb-4">
    <h1 className="text-3xl font-semibold tracking-tight">{header}</h1>
    <p className="text-md text-sm text-primary/50 ">
      {description}?{' '}
      <button className="cursor-pointer text-primary hover:underline" onClick={onClick}>
        {cta}
      </button>
    </p>
  </div>
);

const Separator = ({ text }: { text: string }) => (
  <div className="relative m-1.5">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs lowercase">
      <span className="bg-background px-2 text-muted-foreground">{text}</span>
    </div>
  </div>
);

const variants = {
  0: 'login' as const,
  1: 'register' as const,
};

export type FormState = 'login' | 'register';

const AuthClient = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<'login' | 'register'>('login');

  const t = useTranslations('auth');

  const header = t(`${current}.header`);
  const separator = t(`${current}.separator`);
  const question = t(`${current}.question`);
  const cta = t(`${current}.callToAction`);

  const isLogin = current === 'login';

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(variants[api.selectedScrollSnap() as 0 | 1]);
    });
  }, [api]);

  const handleClick = useCallback(() => {
    const actions = {
      login: api?.scrollNext,
      register: api?.scrollPrev,
    };

    actions[current]?.();
  }, [current, api]);

  return (
    <>
      <div className="mx-auto space-y-4 sm:w-[350px]">
        <Header header={header} description={question} cta={cta} onClick={handleClick} />
        <Carousel setApi={setApi} disableKeysNav opts={{ watchDrag: false }}>
          <CarouselContent>
            <CarouselItem>
              <LazyLoginForm
                validateEmail={validateEmail}
                submit={login}
                disabled={!isLogin}
              />
            </CarouselItem>
            <CarouselItem>
              <LazyRegisterForm disabled={isLogin} register={register} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <Separator text={separator} />
        <LazyOAuthSignIn providers={['github', 'google']} />
        {/* <AuthFormSwitch
                    question={question}
                    callToAction={callToAction}
                    onClick={handleClick}
                /> */}
      </div>
      <AuthFooter />
    </>
  );
};

export default AuthClient;
