// 冒頭に動画ファイルのインポート文章を追加
// 動画を読み込む
import cyberWideMovie from '@/assets/movie/cyber-wide.mp4';
import idolstageMovie from '@/assets/movie/idolstage.mp4';
import magicMovie from '@/assets/movie/magic.mp4';

// ページで読み込んで切り替えるための辞書
export const moviesList = [
  {
    id: 'cyber-wide',
    videoUrl: cyberWideMovie
  },
  {
    id: 'idolstage',
    videoUrl: idolstageMovie
  },
  {
    id: 'magic',
    videoUrl: magicMovie
  }
];