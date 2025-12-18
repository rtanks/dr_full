import '../../support.css'
export default function QuestionItem({title, children}) {
    return (
        <details className="faq" role="listitem">
          <summary>
            <span>{title}</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="faq-body">
            {children}
          </div>
        </details>
    )
}