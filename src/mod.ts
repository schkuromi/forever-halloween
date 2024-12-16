import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ISeasonalEventConfig } from "@spt/models/spt/config/ISeasonalEventConfig";

class Mod implements IPreSptLoadMod
{
    public preSptLoad(container: DependencyContainer): void
    {
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        // get the config server so we can get a config with it
        const configServer = container.resolve<ConfigServer>("ConfigServer");

        // Request seasonal event config
        const seasonConfig: ISeasonalEventConfig = configServer.getConfig<ISeasonalEventConfig>(ConfigTypes.SEASONAL_EVENT);

        // change the seasonal event config
        for (const i in seasonConfig.events)
        {
            // coutresy mattdokn & jehree
            if (seasonConfig.events[i].name == "halloween") 
            {
                seasonConfig.events[i].startDay = 1;
                seasonConfig.events[i].startMonth = 1;
                seasonConfig.events[i].endDay = 32;
                seasonConfig.events[i].endMonth = 12;
            }
            else 
            {
                seasonConfig.events[i].enabled = false;
            }
        }
        
        // log the changes
        logger.log("[SCHKRM] Halloween is now forever!", "yellow");

    }
}

export const mod = new Mod();