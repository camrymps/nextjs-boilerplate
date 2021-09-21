import AlertProps from '../types/AlertProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

export default function Alert({ type, message }: AlertProps) {
  let color;
  let icon;

  switch (type) {
    case 'success':
      color = 'green';
      icon = faCheckCircle;
      break;
    case 'info':
      color = 'blue';
      icon = faInfoCircle;
      break;
    case 'warning':
      color = 'yellow';
      icon = faExclamationCircle;
      break;
    case 'error':
      color = 'red';
      icon = faTimesCircle;
      break;
    default:
      color = 'blue';
      icon = faInfoCircle;
      break;
  }

  return (
    <div className={`rounded-md bg-${color}-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <FontAwesomeIcon
            icon={icon}
            className={`h-5 w-5 text-${color}-400`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={`text-sm text-${color}-700`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
