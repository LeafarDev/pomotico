export type ConfigDataType = {
  sprintTime: {
    minutes: number;
    seconds: number;
  };
  restTime: {
    minutes: number;
    seconds: number;
  };
  sprintGoal: number;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
};

export type ConfigDataToFormType = {
  sprintTime: {
    minutes: string;
    seconds: string;
  };
  restTime: {
    minutes: string;
    seconds: string;
  };
  sprintGoal: string;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
};
