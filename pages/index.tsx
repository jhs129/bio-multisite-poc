import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../builder-registry";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { GetStaticProps } from "next";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (apiKey) {
  builder.init(apiKey);
} else {
  console.error("NEXT_PUBLIC_BUILDER_API_KEY is not defined");
}
builder.apiVersion = "v3";

interface PageProps {
  page: any;
}

// Define the Page component
const Page: React.FC<PageProps> = ({ page }) => {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      {/* Render the Builder page */}
      <Header />
      <div className="container mx-auto px-4">
        <BuilderComponent model="page" content={page || undefined} />
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (Array.isArray(params?.page) ? params.page.join("/") : params?.page || ""),
      },
      options: {
        vercelPreview: true,
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

export default Page;
