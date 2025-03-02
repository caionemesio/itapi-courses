'use client'
import CertificateIcon from '../../../public/Certificate-icon'
import GrowthGraphIcon from '../../../public/Growh-grph-icon'
import EntrepreneurshipInnovationIcon from '../../../public/EntrepreneurshipInnovationIcon'
import CardReasons from './components/CardReasons'
import { CardReasonsType } from './components/types'

export default function ReasonsToTakeTheCourse() {
  const cards: CardReasonsType[] = [
    {
      title: 'Certificações Profissionais',
      description:
        'Prepare-se para certificações reconhecidas pelo mercado de trabalho, resolvendo desafios do mundo real.',
      Icon: CertificateIcon,
    },
    {
      title: 'Desenvolvimento Pessoal e Profissional',
      description:
        'Aprimore sua comunicação, trabalho em equipe e resolução de problemas para se destacar no dia a dia e na carreira.',
      Icon: GrowthGraphIcon,
    },
    {
      title: 'Empreendedorismo e Inovação',
      description:
        'Desperte seu espírito empreendedor com cursos que incentivam a criatividade e oferecem estratégias para inovar e crescer no mercado.',
      Icon: EntrepreneurshipInnovationIcon,
    },
  ]
  return (
    <div className="  max-w-[1440px] ml-auto mr-auto mt-4 p-4 ">
      <div className="flex justify-between">
        {cards.map((card, index) => (
          <CardReasons key={index} {...card} />
        ))}
      </div>
    </div>
  )
}
