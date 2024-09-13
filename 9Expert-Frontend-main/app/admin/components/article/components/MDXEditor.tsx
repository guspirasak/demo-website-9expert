'use client'

import { useCreateArticle } from '@/app/admin/context/CreateArticleContext'
import { UploadApiResponse } from '@/app/components/Markdown/Markdown.interface'
import { uploadArticleDesctiption } from '@/libs/AdminAPI'
import { useToast } from '@chakra-ui/react'
import { AdmonitionDirectiveDescriptor, BlockTypeSelect, BoldItalicUnderlineToggles, ChangeCodeMirrorLanguage, codeBlockPlugin, codeMirrorPlugin, CodeToggle, ConditionalContents, CreateLink, diffSourcePlugin, DiffSourceToggleWrapper, directivesPlugin, frontmatterPlugin, headingsPlugin, imagePlugin, InsertAdmonition, InsertCodeBlock, InsertFrontmatter, InsertImage, InsertSandpack, InsertTable, InsertThematicBreak, linkDialogPlugin, listsPlugin, ListsToggle, markdownShortcutPlugin, MDXEditor, quotePlugin, SandpackConfig, sandpackPlugin, ShowSandpackInfo, tablePlugin, thematicBreakPlugin, toolbarPlugin, UndoRedo } from '@mdxeditor/editor'
import { useRef } from 'react'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const admonitionMarkdown = `

:::note
foo
:::

:::tip
Some **content** with _Markdown_ syntax. Check [this component](https://virtuoso.dev/).
:::

:::info
Some **content** with _Markdown_ syntax. 
:::

:::caution
Some **content** with _Markdown_ syntax.
:::

:::danger
Some **content** with _Markdown_ syntax.
:::
`

const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'light',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: defaultSnippetContent
        },
    ]
}

export const MDXEditorComponent = () => {

    const { state, setState } = useCreateArticle()
    const toast = useToast()

    const mdxRef = useRef<any>()

    const imageUploadHandler = async (image: File): Promise<string> => {
        let url = ''
        const reader = new FileReader();
        const [result] = await Promise.all([
            new Promise<string>((resolve) => {
                reader.readAsDataURL(image);
                reader.onload = () => resolve(reader.result as string);
            }),
        ]);

        await uploadArticleDesctiption([result as string], (data: UploadApiResponse[], error: unknown) => {
            if (error) {
                toast({
                    title: 'Failed to upload image',
                    description: error as string,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
            }

            url = data[0].url
        })

        return url;
    };

    return (
        <MDXEditor
            ref={mdxRef}
            className="md-article-detail"
            markdown={state.articleDetail}
            onBlur={() => setState(prev => ({ ...prev, articleDetail: mdxRef.current.getMarkdown() }))}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                linkDialogPlugin(),
                codeBlockPlugin(),
                tablePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                diffSourcePlugin({ diffMarkdown: state.articleDetail, viewMode: 'rich-text' }),
                frontmatterPlugin(),
                thematicBreakPlugin(),
                imagePlugin({ imageUploadHandler }),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            {' '}
                            <UndoRedo />
                            {
                                <div style={{ height: '1.5rem', borderLeft: "1px solid #ccc", marginLeft: "0.25rem", marginRight: "0.5rem" }}></div>
                            }
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            {
                                <div style={{ height: '1.5rem', borderLeft: "1px solid #ccc", marginLeft: "0.25rem", marginRight: "0.5rem" }}></div>
                            }
                            <InsertImage />
                            <InsertTable />
                            <CreateLink />
                            {
                                <div style={{ height: '1.5rem', borderLeft: "1px solid #ccc", marginLeft: "0.25rem", marginRight: "0.5rem" }}></div>
                            }
                            <ListsToggle />
                            {
                                <div style={{ height: '1.5rem', borderLeft: "1px solid #ccc", marginLeft: "0.25rem", marginRight: "0.5rem" }}></div>
                            }
                            <CodeToggle />

                            <ConditionalContents
                                options={[
                                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                                    {
                                        fallback: () => (<>
                                            <InsertCodeBlock />
                                            <InsertSandpack />
                                        </>)
                                    }
                                ]}
                            />
                            {
                                <div style={{ height: '1.5rem', borderLeft: "1px solid #ccc", marginLeft: "0.25rem", marginRight: "0.5rem" }}></div>
                            }
                            <InsertThematicBreak />
                            <InsertFrontmatter />
                            <InsertAdmonition />
                            <DiffSourceToggleWrapper>
                                <></>
                            </DiffSourceToggleWrapper>
                        </>
                    )
                })
            ]}
        />
    )
}