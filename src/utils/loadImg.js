// const loadImg = (threshold = 0, rootMargin = '0px', root = null) => {
//   const ob = new IntersectionObserver(() => {}, {
//     root, // 相对于哪个元素
//     rootMargin, // 相对于哪个元素的边界
//     threshold // 0-1 之间的值，表示交叉比例
//   })
// }

const loadImg = () => {
  const imgs = document.querySelectorAll('img[data-src]')
  const len = imgs.length
  if (!len) return
  const ob = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          ob.unobserve(img)
        }
      }
    },
    {
      threshold: 0
    }
  )

  imgs.forEach((item) => ob.observe(item))
}
export default loadImg
