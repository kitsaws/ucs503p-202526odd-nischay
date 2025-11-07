import { useState, useRef, useEffect } from 'react'
import { Button } from './Button'
import { ChevronDown, ChevronUp, Funnel } from 'lucide-react'

const Dropdown = ({ options = [], defaultDisplay = 'All items', onSelect, className = '', children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selection, setSelection] = useState('')
  const dropdownRef = useRef(null)

  const handleSelect = (e, item) => {
    e.preventDefault();
    setSelection(item)
    setIsOpen(false)
    if (onSelect) onSelect(item)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={`relative`}>
      <Button
        variant="border"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full md:w-60 flex justify-between items-center ${className}`}
      >
        {children}
        <p>{selection === '' ? defaultDisplay : selection}</p>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>

      {isOpen && (options.length === 0 ?
        <div className='absolute top-0 translate-y-12 w-full min-h-25 flex justify-center items-center border border-border bg-white rounded-lg'>Nothing to select</div>
        :
        <ul className="absolute top-0 translate-y-12 w-full bg-white border border-border rounded-lg px-4 py-2">
          {options.map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                onClick={(e) => handleSelect(e,   item)}
                className="w-full justify-center"
              >
                {item}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
