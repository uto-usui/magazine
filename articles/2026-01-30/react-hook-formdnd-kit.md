---
title: "React Hook Formとdnd kitを使った並び替え可能なフォームの開発"
source: "https://tech.smarthr.jp/entry/2026/01/27/190742"
publishedDate: "2026-01-27"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

![React Hook Formとdnd kitを使った並び替え可能なフォームの開発](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260127/20260127190748.png)

こんにちは、SmartHRのプロダクトエンジニアのmorisyです。現在開発中のプロダクトでReact Hook Formで作ったフォームの入力項目をドラッグ＆ドロップで並び替えるというUIを実装しました。

並び替えの実装にはdnd kitというライブラリを使用しました。今回はReact Hook Formとdnd kitを組み合わせて、入力項目をドラッグ＆ドロップできるフォームの実装について解説します。実装時にぶつかった課題とその解決方法についても紹介します。

## 利用するライブラリ

今回の実装では、React Hook Formとdnd kitという2つのライブラリを使用します。

### React Hook Form

React Hook Formは、Reactでのフォームバリデーションや状態管理を効率化するためのライブラリです。再レンダリングを最小限に抑えつつ、パフォーマンスの高いフォームを容易に実装できます。

### dnd kit

dnd kitは、React向けのドラッグ&ドロップ機能を構築するためのライブラリです。軽量かつモジュール化されており、アクセシビリティへの対応やカスタマイズ性に優れているのが特徴です。

## 今回実装したいUIイメージ

以下は開発したUIを解説用に簡易化したものです。今回はこちらのUIイメージで解説をします。

![UIイメージ](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260127/20260127190744.png)

UIイメージ

入力フォームが含まれる各要素（アイテム）を、ユーザーがドラッグ＆ドロップで並び替えられます。また、各ボタンをクリックすると新しくアイテムを挿入したり、アイテムを削除できます。

## 実装の構成

今回は以下の構成で実装を行います。

-   `useSampleForm.ts`
    -   React Hook Formでフォームの状態を管理するカスタムフック
-   `SortableItem.tsx`
    -   ドラッグ＆ドロップ可能な個別のアイテムコンポーネント
-   `SampleForm.tsx`
    -   フォーム全体を管理するメインコンポーネント

また、事前に以下のコマンドを実行して、必要なパッケージをインストールしてください。

// pnpmの場合
pnpm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-hook-form

// yarnの場合
yarn add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-hook-form

## フォームの実装

React Hook Formを使ってフォームを構築します。趣旨とズレるため詳細な説明は割愛しますが、この例ではスキーマ定義とバリデーションのためのライブラリであるZodを利用します。

const createFormSchema = () \=>
  z.object({
    items: z.array(
      z.object({
        value: z.string(),
      }),
    ),
  })

type FormSchema \= $z.infer<ReturnType<typeof createFormSchema\>>

const useSampleForm = () \=> {
  const methods = useForm<FormSchema\>({
    mode: 'onChange',
    resolver: zodResolver(createFormSchema()),
    defaultValues: {
      items: \[{ value: 'item1' }, { value: 'item2' }, { value: 'item3' }\],
    },
  })

  return methods
}

## UIと並び替えの実装

フォームは前項で構築したため、次はUIとdnd kitを使ったドラッグ＆ドロップによるソートの実装を行います。

基本的な実装はdnd kit公式の[Sortable](https://docs.dndkit.com/presets/sortable#overview)のページを参考にしているため、併せて参考にしてください。

type SortableItemProps \= {
  id: string
  register: UseFormRegister<FormSchema\>
  onRemove: () \=> void
  index: number
}

const SortableItem = ({ id, register, remove, index }: SortableItemProps) \=> {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    li ref\={setNodeRef} style\={style}
      div {...attributes} {...listeners}
        div className\="shr-flex shr-items-center shr-gap-0.5"
          FaGripVerticalIcon 
          {}
          input {...register(\`items.${index}.value\`)} className\="shr-h-2 shr-mb-0.5 shr-w-\[255px\]" title\="title" 
          button type\="button" onClick\={() \=> onRemove()}
            削除
          button
        div
      div
    li
  )
}

import { useFieldArray, useForm, UseFormRegister } from 'react-hook-form'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { defaultAnimateLayoutChanges, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const SampleForm = () \=> {
  const { register, handleSubmit, control } = useSampleForm()

  const onSubmit = (data: FormSchema) \=> {
    console.log(data)
  }

  const { fields, move, append } = useFieldArray({
    control,
    name: 'items',
  })

  const handleDragEnd = (event: DragEndEvent) \=> {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const activeIndex = fields.findIndex((item) \=> item.id === active.id)
      const overIndex = fields.findIndex((item) \=> item.id === over.id)
      move(activeIndex, overIndex)
    }
  }

  const handleAddItem = () \=> {
    append({ value: '' })
  }

  return (
    form onSubmit\={handleSubmit(onSubmit)}
      DndContext onDragEnd\={handleDragEnd}
        SortableContext items\={fields} strategy\={verticalListSortingStrategy}
          ul className\="shr-mb-1 shr-list-none"
            {fields.map((field, index) \=> (
              SortableItem key\={field.id} id\={field.id} register\={register} index\={index} 
            ))}
          ul
        SortableContext
      DndContext
      hr 
      button type\="button" onClick\={handleAddItem}
        追加
      button
    form
  )
}

React Hook Formと併用する際は、`useFieldArray`を使用して`fields`を取得することが重要です。`useFieldArray`を使うことで、以下のメリットがあります。

-   配列の各要素に一意の`id`が自動的に付与される（dnd kitのソートに必須）
-   `move`、`append`などの配列操作関数が提供され、フォームの状態と同期される
-   配列の変更が適切にReact Hook Formに反映される

今回は`move`関数を使った並び替え関数（`handleDragEnd`）を`DndContext`の`onDragEnd`に指定することで、ドラッグ＆ドロップ完了時に配列を並び替えています。

## 直面した課題とその解決

ここからは、実装時に遭遇した課題とその解決策について解説します。

### ボタンやインプットをクリックしても反応しない

実装したフォームで、並び替え可能な要素に含まれるボタンやインプットをクリックしても反応しない事象が起きました。

これは、クリックしたときにボタンやインプットのイベントよりも、ドラッグ＆ドロップの処理が優先されることが原因でした。dnd kitはデフォルトでマウスダウンイベントを即座にドラッグ操作として解釈するため、クリックイベントが発火する前に処理が奪われてしまいます。

この解決策として、dnd kitのsensor機能を利用してドラッグ＆ドロップ処理の遅延を発生させることで、クリックイベントを正常に動作させます。

const sensors = useSensors(
  useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  }),
)

return (
form onSubmit\={handleSubmit(onSubmit)}
    {}
    DndContext onDragEnd\={handleDragEnd} sensors\={sensors}
{}

`MouseSensor`に`activationConstraint.distance`を設定することで、指定したピクセル数だけマウスが移動するまでドラッグが開始されないようになります。今回は5pxに設定していますが、この値はUIの使い勝手に応じて調整可能です。値が小さすぎるとクリックが反応しづらくなり、大きすぎるとドラッグが開始しづらくなるため、実際の操作感を確認しながら調整してください。

### アイテムを追加したときに画面外にアイテムが追加されて使いづらい

追加ボタンをクリックするとアイテムを追加できますが、アイテムが増えると画面の表示領域を超え、新しいアイテムと追加ボタンが画面外にはみ出して使いづらいという課題がありました。

そこで、`scrollIntoView`を利用して、アイテムの追加時にスクロールを行うことで、常にユーザーが新しいアイテムと追加ボタンを画面内に捉えられるようにしました。結果として、追加するたびに自動的にスクロールされ、追加されたアイテムを認識しやすく、また連続してアイテムを追加する際も手動でスクロールせずに追加できる便利なUIになりました。

実装では、`requestAnimationFrame`を使用してDOMの更新を待ってからスクロールを実行しています。これは、`append`の直後ではまだ新しいアイテムがDOMに反映されていないので、確実にスクロールを実行するための処理です。

const addButtonRef = useRef<HTMLButtonElement\>(null)
const handleAddItem = () \=> {
  append({ value: '' })
  
  requestAnimationFrame(() \=> {
    addButtonRef.current?.scrollIntoView({ behavior: 'smooth' })
  })
}

{}
button ref\={addButtonRef} type\="button" onClick\={handleAddItem}
  追加
button

## まとめ

React Hook Formとdnd kitを組み合わせることで、ユーザーが直感的に操作できる並び替え可能なフォームを簡単に実装できます。今回は解説用のシンプルな実装でしたが、各ライブラリの機能を使うことで、もっと複雑なフォームや並び替え処理に対応することも可能です。本記事が、同様の機能を実装する際の参考になれば幸いです。

また、dnd kitで入力フォームを並び替えする際の課題については「[dnd kitを使った並べ替えUI実装の課題と解決策 - SmartHR Tech Blog](https://tech.smarthr.jp/entry/2025/01/27/143120)」にも参考になる情報がありますので、こちらもご参照ください。

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)