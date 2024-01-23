"use client"

import { useState } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import Link from "next/link"
import ArrowVector from "@/public/icons/arrow-right-up.svg"
import CloseVector from "@/public/icons/close-fill.svg"
import HeaderVector from "@/public/icons/menu-burger.svg"

import { LangProps } from "@/types/common"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  Discord,
  Github,
  Mirror,
  Twitter,
} from "@/components/svgs/social-medias"
import { useTranslation } from "@/app/i18n/client"
import { LanguageMapping, languagesItems } from "@/app/i18n/settings"

import { Icons } from "./icons"

const LanguageSwitcher = ({ lang }: LangProps["params"]) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!siteConfig?.showLanguageSwitcher) return null

  return (
    <div className="flex flex-col border-b-2 border-white px-[14px] py-[16px] pt-0">
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        type="button"
        className="flex items-center gap-2 uppercase"
      >
        <Icons.globe className="text-white" size={22} fill="white" />
        <span className="text-base font-medium uppercase text-white">
          {LanguageMapping[lang] ?? LanguageMapping["en"]}
        </span>
        <Icons.arrowDown />
      </button>
      {isOpen && (
        <div className="ml-8 mt-4 flex flex-col gap-1">
          {languagesItems?.map(({ label, value: languageKey }, index) => {
            const isActive = languageKey === lang
            return (
              <Link
                className={cn(
                  "py-2 uppercase",
                  isActive
                    ? "font-medium text-anakiwa-500"
                    : "font-normal text-white"
                )}
                href={`/${languageKey}`}
                key={index}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function SiteHeaderMobile({ lang }: LangProps["params"]) {
  const [header, setHeader] = useState(false)
  const { t } = useTranslation(lang, "common")

  return (
    <div className="flex items-center md:hidden">
      <NextImage
        src={HeaderVector}
        alt="logo"
        className="cursor-pointer"
        onClick={() => setHeader(true)}
        width={24}
        height={24}
      />
      {header && (
        <div
          className="z-5 fixed inset-0 flex justify-end bg-black opacity-50"
          onClick={() => setHeader(false)}
        ></div>
      )}
      {header && (
        <div className="fixed inset-y-0 right-0 z-10 flex w-[257px] flex-col bg-black text-white">
          <div className="flex justify-end p-[37px]">
            <NextImage
              src={CloseVector}
              alt="closeVector"
              className="cursor-pointer"
              onClick={() => setHeader(false)}
              width={24}
              height={24}
            />
          </div>
          <div className="flex w-full flex-col gap-5 px-[16px] text-base font-medium">
            <NextLink
              href={`/${lang}`}
              onClick={() => setHeader(false)}
              className="border-y-2 border-white p-[16px] uppercase"
            >
              {t("menu.home")}
            </NextLink>
            <NextLink
              onClick={() => setHeader(false)}
              href={`${lang}/projects`}
              className="border-b-2 border-white p-[16px] pt-0 uppercase"
            >
              {t("menu.projectLibrary")}
            </NextLink>
            <NextLink
              onClick={() => setHeader(false)}
              href={`/${lang}/about`}
              className="border-b-2 border-white p-[16px] pt-0 uppercase"
            >
              {t("menu.about")}
            </NextLink>
            <NextLink
              onClick={() => setHeader(false)}
              href={`/${lang}/resources`}
              className="border-b-2 border-white p-[16px] pt-0 uppercase"
            >
              {t("menu.resources")}
            </NextLink>
            <NextLink
              href={siteConfig.links.jobs}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 border-b-2 border-white p-[16px] pt-0 uppercase"
            >
              {t("menu.jobs")}
              <NextImage src={ArrowVector} alt="logo" width={24} height={24} />
            </NextLink>

            <LanguageSwitcher lang={lang} />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-end gap-5 py-[40px] text-sm">
            <div className="flex gap-5">
              <NextLink
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter color="white" />{" "}
              </NextLink>

              <NextLink
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <Discord color="white" />{" "}
              </NextLink>
              <NextLink
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github color="white" />{" "}
              </NextLink>
              <NextLink
                href={siteConfig.links.articles}
                target="_blank"
                rel="noreferrer"
              >
                <Mirror color="white" />{" "}
              </NextLink>
            </div>
            <div className="flex gap-5 text-white">
              <h1>{t("footer.privacyPolicy")}</h1>
              <h1>{t("footer.termsOfUse")}</h1>
            </div>
            <h1 className="text-center text-gray-400">
              {t("lastUpdatedAt", {
                date: "January 16, 2024",
              })}
            </h1>
          </div>
        </div>
      )}
    </div>
  )
}
