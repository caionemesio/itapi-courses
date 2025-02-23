import { useMemo, useState } from 'react'
import CourseCategories from './components/CourseCategories'
import CourseList from './components/CourseList'
import { Course } from './types'

export default function CourseCatalog() {
  const coursesByCategory: Record<number, Course[]> = useMemo(
    () => ({
      1: [
        {
          title: 'Curso de React',
          description: 'Aprenda a criar aplicações web com React',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Vue',
          description: 'Aprenda a criar aplicações web com Vue',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Angular',
          description: 'Aprenda a criar aplicações web com Angular',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
      ],
      2: [
        {
          title: 'Curso de Photoshop',
          description: 'Aprenda a editar imagens e criar composições',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
        {
          title: 'Curso de Illustrator',
          description: 'Aprenda a criar ilustrações e gráficos vetoriais',
          url: 'https://www.alura.com.br/',
          image: '/curso-tecnico.jpg',
        },
      ],
      // Adicione outras categorias conforme necessário
    }),
    [],
  )
  const [selectedCategory, setSelectedCategory] = useState(1)
  const courses = coursesByCategory[selectedCategory] || []

  return (
    <>
      <div className="  max-w-[1440px] ml-auto mr-auto ">
        <div className="py-6 px-4">
          <h1 className="text-slate-700  text-3xl font-semibold md:text-5xl  ">
            Formação Municipal
          </h1>
          <p className="text-gray-500 text-lg md:text-xl  mt-4">
            Cursos e capacitações para transformar sua carreira e te preparar
            para o mercado de trabalho
          </p>
        </div>
        <CourseCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="bg-lightBackground">
        <div className="max-w-[1440px] ml-auto py-4 flex gap-4 mr-auto ">
          {courses.map((course) => (
            <CourseList
              key={course.title}
              title={course.title}
              description={course.description}
              url={course.url}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </>
  )
}
