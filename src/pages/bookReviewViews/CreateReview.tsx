import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createReviewSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  url: z.string().min(1, { message: 'URLは必須です' }),
  detail: z.string().min(1, { message: '詳細は必須です' }),
  review: z.string().min(1, { message: 'レビューは必須です' }),
});

export type CreateReview = z.infer<typeof createReviewSchema>;

const CreateReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReview>({
    mode: 'onSubmit',
    resolver: zodResolver(createReviewSchema),
  });

  const onSubmit: SubmitHandler<CreateReview> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <main>
        <h1>書籍レビューの投稿</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">
              タイトル
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              placeholder="タイトルを入力してください"
            />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="url">
              URL
              <span className="text-red-600">*</span>
            </label>
            <input type="text" id="url" {...register('url')} placeholder="URLを入力してください" />
            {errors.url && <p className="text-red-600">{errors.url.message}</p>}
          </div>
          <div>
            <label htmlFor="detail">
              詳細
              <span className="text-red-600">*</span>
            </label>
            <textarea id="detail" {...register('detail')} placeholder="詳細を入力してください" />
            {errors.detail && <p className="text-red-600">{errors.detail.message}</p>}
          </div>
          <div>
            <label htmlFor="review">
              レビュー
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="review"
              {...register('review')}
              placeholder="レビューを入力してください"
            />
            {errors.review && <p className="text-red-600">{errors.review.message}</p>}
          </div>
          <button type="submit">投稿</button>
        </form>
      </main>
    </div>
  );
};

export default CreateReview;
