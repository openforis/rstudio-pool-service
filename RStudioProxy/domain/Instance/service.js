const InstanceModel = require("./model");

const getInstanceMiddleware = async (req, res, next) => {
  const instancesIds = await InstanceModel.getInstancesIds();

  let instanceId = false;
  let userId = false;
  const originalUrl = req.originalUrl;
  const originalUrlSplitted = originalUrl.split("_");

  if (
    originalUrlSplitted.length === 2 &&
    instancesIds.includes(originalUrlSplitted[0].replace("/", ""))
  ) {
    instanceId = originalUrlSplitted[0].replace("/", "");
    userId = originalUrlSplitted[1];
  }

  const referer = req.headers.referer;
  const refererSplitted = (referer || "").split("_");
  const instanceIdOnReferer = refererSplitted[0]
    ? InstanceModel.getInstanceIdByReferer({
        instancesIds,
        referer: refererSplitted[0],
      })
    : false;

  if (instanceIdOnReferer) {
    instanceId = instanceIdOnReferer;
    userId = refererSplitted[1];
  }

  let instance = false;
  if (instanceId && userId) {
    instance = await InstanceModel.getInstance({ instanceId, userId });
  }

  if (instanceId && instance) {
    req.instance = instance;
    req.instanceId = instanceId;
    req.userId = userId;
  }
  next();
};

module.exports = {
  getInstanceMiddleware,
};
