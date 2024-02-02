import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RadioTogglers({options, defaultValue, onChange}) {
    return (
        <div className="radio-togglers shadow">
            {options.map((option) => (
                <label key={option.label}>
                    <input
                        type="radio"
                        name="bgType"
                        onClick={event => onChange(event.target.value)}
                        defaultChecked={defaultValue === option.value}
                        value={option.value}
                    />    
                    <div>
                        <FontAwesomeIcon icon={option.icon} />
                        <span>
                            {option.label}
                        </span>
                    </div>
                </label>
            ))}
            {/* <label>
                <input type="radio" name="bgType" value="color" />    
                <div>
                    <FontAwesomeIcon icon={faPalette} />
                    <span>
                        Color
                    </span>
                </div>
            </label> */}
            {/* We have decided to apply the selected options that a user choose
            <label>
                <input type="radio" name="bgType" value="color" />    
                <div>
                    <FontAwesomeIcon icon={faImage} />
                    <span>
                        Image   
                    </span>
                </div>
            </label> */}
        </div>
    )
}
